<?php
/*
Plugin Name: Quote Generator Plugin
Description: TBS Quote Generator Template
Version: 1.2
Author: Mello TBS Dev
*/

// Enqueue scripts and styles
function quote_generator_enqueue_scripts() {
    // Enqueue Bootstrap CSS
    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css');

    // Enqueue custom stylesheet
    wp_enqueue_style('quote-generator-style', plugin_dir_url(__FILE__) . 'assets/css/style.css');

    // Enqueue jQuery (required for Bootstrap JavaScript)
    wp_enqueue_script('jquery');

    // Enqueue Bootstrap JavaScript
    wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js', array('jquery'), '4.6.2', true);

    // Enqueue custom JavaScript
    wp_enqueue_script('quote-generator-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0', true);

}
add_action('wp_enqueue_scripts', 'quote_generator_enqueue_scripts');

// Add shortcode to render the quote generator form
function render_quote_generator_form() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/quote-generator-form.php');
    return ob_get_clean();
}
add_shortcode('quote_generator_form', 'render_quote_generator_form');

use Dompdf\Dompdf;
use Dompdf\Options;

function process_quote_form() {
    // Ensure Dompdf library is included
    require_once 'vendor/autoload.php';

    // Retrieve form data
    $quotation_date = isset($_POST['quotation_date']) ? $_POST['quotation_date'] : '';
    $quotation_valid_date = isset($_POST['quotation_valid_date']) ? $_POST['quotation_valid_date'] : '';
    $project_desc = isset($_POST['project_desc']) ? $_POST['project_desc'] : '';
    $company_name = isset($_POST['company_name']) ? $_POST['company_name'] : '';
    $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : '';
    $company_address = isset($_POST['company_address']) ? $_POST['company_address'] : '';
    $company_email = isset($_POST['company_email']) ? $_POST['company_email'] : '';
    $company_phone = isset($_POST['company_phone']) ? $_POST['company_phone'] : '';
    $client_name = isset($_POST['client_name']) ? $_POST['client_name'] : '';
    $client_address = isset($_POST['client_address']) ? $_POST['client_address'] : '';
    $client_email = isset($_POST['client_email']) ? $_POST['client_email'] : '';
    $client_phone = isset($_POST['client_phone']) ? $_POST['client_phone'] : '';
    $customer_tax_id = isset($_POST['customer_tax_id']) ? $_POST['customer_tax_id'] : '';
    $remark = isset($_POST['remark']) ? $_POST['remark'] : '';
    $discount_type = isset($_POST['discount_type']) ? $_POST['discount_type'] : '';
    $discount = isset($_POST['discount']) ? $_POST['discount'] : '';
    $vat_percentage = isset($_POST['vat_percentage']) ? $_POST['vat_percentage'] : '';
    $selected_currency = isset($_POST['currency']) ? $_POST['currency'] : 'THB'; // Default to THB if not set


    // Retrieve items data - services
    $items = array();
    if (isset($_POST['item']) && isset($_POST['quantity']) && isset($_POST['price'])) {
        $item_descriptions = $_POST['item'];
        $quantities = $_POST['quantity'];
        $prices = $_POST['price'];

        $total_amount = 0; // Initialize total amount
        foreach ($item_descriptions as $index => $item_description) {
            $quantity = isset($quantities[$index]) ? $quantities[$index] : '';
            $price = isset($prices[$index]) ? $prices[$index] : '';
            $total_prices[$index] = $quantity * $price; // Calculate total price for each item
            $total_amount += $total_prices[$index]; // Add total price of each item to calculate total amount
            $items[] = array(
                'description' => $item_description,
                'quantity' => $quantity,
                'price' => $price,
                'total_price' => $total_prices[$index] // Add total price to items array
            );
        }

       // Calculate VAT amount
        $vat_amount = ($total_amount * $vat_percentage) / 100;

        $discount_sub_total = 0; // Initialize discount subtotal

        if ($discount_type === 'percentage') {
            $discount_sub_total = $total_amount * ($discount / 100);
        } else if ($discount_type === 'fixed') {
            // Ensure fixed discount does not exceed total amount
            $discount_sub_total = min($discount, $total_amount);
        }
        
        // Calculate total amount with VAT and discount applied
        $total_amount_with_vat_discount = ($total_amount + $vat_amount) - $discount_sub_total;
        

    }
   
    switch ($selected_currency) {
        case 'USD':
            $currency_symbol = '$';
            break;
        case 'GBP':
            $currency_symbol = '£';
            break;
        case 'EUR':
            $currency_symbol = '€';
            break;
        case 'SGD':
            $currency_symbol = 'S$';
            break;
        default:
            $currency_symbol = '฿'; // Default to Thai Baht
            break;
    }

    // Include the template file
    ob_start(); // Start output buffering
    include 'templates/quote-content-template.php'; 
    $content = ob_get_clean(); 

    // Configure Dompdf options
    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $options->set('isRemoteEnabled', true);

    // Instantiate Dompdf
    $dompdf = new Dompdf($options);

    // Load HTML content
    $dompdf->loadHtml($content);

    // Set paper size and orientation
    $dompdf->setPaper('a3', 'portrait');

    // Render the HTML as PDF
    $dompdf->render();

    // Get the height of the rendered PDF
    $pdf_height = $dompdf->getCanvas()->get_height();

    // Get the maximum height allowed for the page
    $max_page_height = $dompdf->getOptions()->get('page_height');

    // If the rendered PDF height exceeds the maximum page height, adjust rendering options
    if ($pdf_height > $max_page_height) {
        $options->set('isPhpEnabled', false); // Disable PHP
        $options->set('isRemoteEnabled', false); // Disable remote file access
        $options->set('isFontSubsettingEnabled', true); // Enable font subsetting
        $options->set('isFontCacheEnabled', true); // Enable font caching
        $options->set('isHtml5ParserEnabled', false); // Disable HTML5 parser
        $options->set('isJavascriptEnabled', false); // Disable JavaScript
        $options->set('isFontEmbed', false); // Disable font embedding
        $options->set('isCssFloatEnabled', false); // Disable CSS floating
        $dompdf->setOptions($options);

        // Re-render the HTML as PDF with adjusted options
        $dompdf->render();
    }

    // Output the PDF
    $dompdf->stream('quote.pdf', array('Attachment' => 0));
}

add_action('admin_post_process_quote_form', 'process_quote_form');



