<!-- quote-generator-form.php -->
<?php
$current_year = date("Y");
?>
<h1>TBS Price Quotation Generator <sub><?php echo $current_year; ?></sub></h1>

<form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="container mt-4">
    <input type="hidden" name="action" value="process_quote_form">

    <!-- Currency Selection -->
    <div class="form-group">
        <label for="currencySwitch" class="form-label">Select Currency:</label>
        <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="radio" id="thbCurrency" name="currency" value="THB" checked>
            <label class="form-check-label" for="thbCurrency">THB</label>
        </div>
        <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="radio" id="usdCurrency" name="currency" value="USD">
            <label class="form-check-label" for="usdCurrency">USD</label>
        </div>
        <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="radio" id="gbpCurrency" name="currency" value="GBP">
            <label class="form-check-label" for="gbpCurrency">GBP</label>
        </div>
        <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="radio" id="sgdCurrency" name="currency" value="SGD">
            <label class="form-check-label" for="sgdCurrency">SGD</label>
        </div>
        <div class="form-check form-switch form-check-inline">
            <input class="form-check-input" type="radio" id="eurCurrency" name="currency" value="EUR">
            <label class="form-check-label" for="eurCurrency">EUR</label>
        </div>
    </div>

    <!-- Logo section -->
    <h3>General Information</h3>
    <div class="row">
        <div class="col-md-6">
            <!-- Quotation Date -->
            <div class="form-group">
                <label for="quotation_date">Date Created:</label>
                <input type="date" name="quotation_date" class="form-control">
            </div>
        </div>    
        <div class="col-md-6">
            <!-- Quotation Valid Until Date -->
            <div class="form-group">
                <label for="quotation_valid_date">Valid Until Date:</label>
                <input type="date" name="quotation_valid_date" class="form-control">
            </div>
        </div>
    </div>

    <!-- Project Description -->
    <div class="form-group">
        <label for="project_desc" class="sr-only">Quote/Project Description:</label>
        <textarea name="project_desc" id="project_desc" class="form-control" rows="5" placeholder="Enter Quote/Project Description"></textarea>
        <span style="font-size: 14px;">‣ Copy Paste ( • ‣ ○ ) for bullet points.</span>
    </div>

    <!-- Company Information and Quotation To side by side -->
    <div class="row">
        <div class="col-md-6">
            <h3>Client Information</h3>
            <div class="form-group">
                <label class="sr-only" for="client_name">Client Company Name:</label>
                <input type="text" name="client_name" placeholder="Enter client company name" class="form-control">
            </div>
            <!-- Customer Tax ID -->
            <div class="form-group">
                <label class="sr-only" for="customer_tax_id">Valid Until Date:</label>
                <input type="text" name="customer_tax_id" placeholder="Customer Tax ID" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="client_address">Address:</label>
                <input type="text" name="client_address" placeholder="Enter client address" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="client_email">Email:</label>
                <input type="email" name="client_email" placeholder="Enter client email" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="client_phone">Phone:</label>
                <input type="tel" name="client_phone" placeholder="Enter client phone" class="form-control">
            </div>
        </div>
        <div class="col-md-6">
            <h3>Our Information</h3>
            <div class="form-group">
                <label class="sr-only" for="company_name">Company Name:</label>
                <input type="text" name="company_name" value="The Business SEO Co., Ltd (Trading as TBS Marketing)" placeholder="Enter company name" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="full_name">Your Full Name:</label>
                <input type="text" name="full_name" placeholder="Enter Full name" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="company_address">Address:</label>
                <input type="text" name="company_address" value="1023, 4th Floor TPS Building Pattanakarn Road, Suanluang, Bangkok, Thailand, 10250" placeholder="Enter company address" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="company_email">Email:</label>
                <input type="email" name="company_email" placeholder="Enter your company email" class="form-control">
            </div>
            <div class="form-group">
                <label class="sr-only" for="company_phone">Phone:</label>
                <input type="tel" name="company_phone" placeholder="Enter your company mobile" class="form-control">
            </div>
        </div>
    </div>

    <!-- Items Table -->
    <h3>Services</h3>
    <div class="row">
        <div class="col-md-3">
        <select id="service_dropdown" class="form-select" style="margin-bottom:20px;">
            <option value="" selected>Select a service</option>
            <optgroup label="SEO Services">
                <option value="SEO Service 1">SEO Entry Package</option>
                <option value="SEO Service 2">SEO Elite Package</option>
                <option value="SEO Service 3">SEO Premium Package</option>
                <option value="SEO Service 4">SEO First Class Package</option>
            </optgroup>
            <optgroup label="Website - Single Page Site">
                <option value="Website Service 1">Website Single Page Site - Starter</option>
                <option value="Website Service 2">Website Single Page Site - Basic</option>
                <option value="Website Service 3">Website Single Page Site - Business</option>
                <option value="Website Service 4">Website Single Page Site - Premium</option>
            </optgroup>
            <optgroup label="Website - Company Site">    
                <option value="Website Service 5">Website Company Site - Starter</option>
                <option value="Website Service 6">Website Company Site - Basic</option>
                <option value="Website Service 7">Website Company Site - Business</option>
                <option value="Website Service 8">Website Company Site - Premium</option>
            </optgroup>  
            <optgroup label="Website - E-Commerce Site">   
                <option value="Website Service 9">Website E-Commerce Site - Starter</option>
                <option value="Website Service 10">Website E-Commerce Site - Basic</option>
                <option value="Website Service 11">Website E-Commerce Site - Business</option>
                <option value="Website Service 12">Website E-Commerce Site - Premium</option>
            </optgroup>
            <optgroup label="Website Maintenance Services">
                <option value="Website Maintenance 1">Website Maintenance Salepage</option>
                <option value="Website Maintenance 2">Website Maintenance Company</option>
                <option value="Website Maintenance 3">Website Maintenance E-Commerce</option>
            </optgroup>
            <optgroup label="SEM Services - Google Packages">
                <option value="Google Package 1">Startup - Google Package</option>
                <option value="Google Package 2">Standard - Google Package</option>
                <option value="Google Package 3">Enterprise - Google Package</option>
            </optgroup>
            <optgroup label="SEM Services - Facebook Packages">
                <option value="Facebook Package 1">Startup - Facebook Package</option>
                <option value="Facebook Package 2">Standard - Facebook Package</option>
                <option value="Facebook Package 3">Enterprise - Facebook Package</option>
            </optgroup>
            <optgroup label="SEM Services - TikTok Packages">
                <option value="TikTok Package 1">Startup - TikTok Package</option>
                <option value="TikTok Package 2">Standard - TikTok Package</option>
            </optgroup>
            <optgroup label="BackLink Packages">
                <option value="Backlink Package 1">Thai BackLink & Content Creation</option>
            </optgroup>
        </select>
        </div>
    </div>
    <div class="table-responsive">
        <table id="services_table" class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Qty.</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Dynamic rows will be added here by js -->
            </tbody>
        </table>
        <button type="button" id="add_item" class="btn btn-primary" style="margin-bottom:20px;">Add</button>
    </div>
     
    <div class="row">
        <!-- Remark -->
        <div class="col-md-6">
            <label for="remark" class="sr-only">Remark:</label>
            <textarea name="remark" id="remark" class="form-control" rows="10" placeholder="Enter any remarks here"></textarea>
            <span style="font-size: 14px;">‣ Copy Paste ( • ‣ ○ ) for bullet points.</span>
        </div>
        <!-- Prices -->
        <div class="col-md-6">
            <!-- Total Amount -->
            <div class="form-group">
                <p for="total_amount">Total Amount (excluding VAT) - <span id="total_amount_label" class="font-weight-bold">0.00 THB</span></p>
            </div>

            <!-- Discount Type -->
            <div class="form-group row">
                <label for="discount_type" class="col-sm-3 col-form-label">Discount Type:</label>
                <div class="col-sm-9">
                    <select name="discount_type" id="discount_type" class="form-control">
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (THB)</option>
                    </select>
                </div>
            </div>

            <!-- Discount -->
            <div class="form-group row">
                <label for="discount" class="col-sm-3 col-form-label">Discount:</label>
                <div class="col-sm-9">
                    <input type="number" name="discount" id="discount" value="0" class="form-control" min="0" step="0.01">
                </div>
            </div>

            <!-- VAT Percentage -->
            <div class="form-group row">
                <label for="vat_percentage" class="col-sm-3 col-form-label">VAT %:</label>
                <div class="col-sm-9">
                    <input type="number" name="vat_percentage" id="vat_percentage" class="form-control" value="7" min="0" max="100" step="1">
                </div>
            </div>

            <!-- VAT Amount -->
            <div class="form-group">
                <p for="vat_amount">VAT Amount - <span id="vat_amount_label" class="font-weight-bold">0.00 THB</span></p>
            </div>

            <!-- Total Amount with VAT -->
            <div class="form-group">
                <p for="total_amount_with_vat">Total Amount (including VAT) - <span id="total_amount_with_vat_label" class="font-weight-bold">0.00 THB</span></p>
            </div>
        </div>
    </div>   

    <!-- Submit Button -->
    <button type="submit" value="Generate Quote" class="btn btn-success">Generate Quote</button> 
</form>


