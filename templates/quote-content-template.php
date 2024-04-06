<style>
@font-face {
    font-family: 'LineSeed';
    font-style: normal;
    font-weight: normal;
    src: url('<?php echo plugins_url("Quote-Generator/assets/font/LINESeedSansTH_Rg.ttf"); ?>');
}

* {
    font-family: 'LineSeed', Arial, sans-serif;
    line-height: 1;
}

.row {
    display: table;
    width: 100%;
}

.cell {
    display: table-cell;
}

.logo {
    text-align: left;
}

.quotation {
    text-align: right;
}

.customer {
    width: 50%;
}

.date {
    width: 50%;
}

.footer {
    /* position: fixed;
    bottom: 0;
    left: 0; */
    width: 100%;
    text-align: center; /* Center-align the content within the footer */
}
</style>

<div id="quotation">
    <div class="row">
        <div class="cell logo">
            <img src="https://tbs-marketing.com/wp-content/uploads/2024/03/TBS-Logo.png" width="150px">
            <p><?php echo $company_name; ?></p>
        </div>
        <div class="cell quotation">
            <h1>Quotation</h1>
            <p>
                <strong>Quote Date : </strong> <?php echo date('d/m/Y', strtotime($quotation_date)); ?>
                <br>
                <strong>Valid Until : </strong> <?php echo date('d/m/Y', strtotime($quotation_valid_date)); ?>
            </p>
        </div>
    </div>

    <hr>

    <div class="row" style="margin-top:-10px;">
        <div class="cell customer">
            <h4><u>Customer</u></h4>
            <table style="margin-top:-20px;">
                <tr>
                    <td><?php echo $client_name; ?></td>
                </tr>
                <tr>
                    <td><?php echo $client_address; ?></td>
                </tr>
                <tr>
                    <td><?php echo $client_email; ?></td>
                </tr>
                <tr>
                    <td><?php echo $client_phone; ?></td>
                </tr>
            </table>
        </div>
        <div class="cell date">
            <h4><u>Quote/Project Description</u></h4>
            <table style="margin-top:-20px;">
                <tr>
                    <td><?php echo nl2br($project_desc); ?></td>
                </tr>
            </table>
        </div>
    </div>
    
    <div style="margin: 10px 0 0 0;">
        <table style="width: 100%; border-collapse: collapse;">
            <thead style="background-color: #3C3D3A;">
                <tr>
                    <th style="border-bottom: 1px solid black; padding: 10px; text-align: left; color:#fff;">#</th>
                    <th style="border-bottom: 1px solid black; padding: 10px; text-align: left; color:#fff;">Description</th>
                    <th style="border-bottom: 1px solid black; padding: 10px; text-align: left; color:#fff;">Qty.</th>
                    <th style="border-bottom: 1px solid black; padding: 10px; text-align: left; color:#fff;">Rate</th>
                    <th style="border-bottom: 1px solid black; padding: 10px; text-align: left; color:#fff;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $index => $item) : ?>
                    <tr>
                        <td style="border-bottom: 1px solid black; padding: 5px; font-size:14px;"><?php echo $index + 1; ?></td>
                        <td style="border-bottom: 1px solid black; padding: 5px; font-size:14px;"><?php echo $item['description']; ?></td>
                        <td style="border-bottom: 1px solid black; padding: 5px; font-size:14px;"><?php echo $item['quantity']; ?></td>
                        <td style="border-bottom: 1px solid black; padding: 5px; font-size:14px;">
                            <?php 
                                if ($item['price'] == 0) {
                                    echo "Included";
                                } else {
                                    echo $currency_symbol . " " . number_format($item['price'], 0);
                                }
                                
                            ?>
                        </td>
                        <td style="border-bottom: 1px solid black; padding: 8px; font-size:14px;">
                            <?php 
                                if ($item['price'] == 0) {
                                    echo "-";
                                } else {
                                    echo $currency_symbol . " " . number_format($item['total_price'], 0);
                                }
                            ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="row" style="position: relative;">
    <table class="inner-table" style="width: 40%; position: absolute; right: 0;">
        <tr>
            <td style="text-align: left;padding: 10px; font-size: 14px;"><strong>Sub Total </strong></td>
            <td style="text-align: right; padding: 10px; font-size: 14px;"><?php echo $currency_symbol; ?> <?php echo number_format($total_amount, 0); ?></td>
        </tr>
        <?php if ($discount != 0): ?>
        <tr>
            <?php if ($discount_type === 'percentage'): ?>
                <td style="text-align: left;padding: 10px; font-size: 14px;"><strong>Discount</strong> (<?php echo number_format($discount, 0) . '%'; ?>)</td>
            <?php else: ?>
                <td style="text-align: left;padding: 10px; font-size: 14px;"><strong>Discount</strong> (<?php echo $currency_symbol; ?> <?php echo number_format($discount, 0); ?>)</td>
            <?php endif; ?>
            <td style="text-align: right; padding: 10px; font-size: 14px;">- <?php echo $currency_symbol; ?> <?php echo number_format($discount_sub_total); ?></td>
        </tr>
        <?php endif; ?>
        <tr>
            <td style="text-align: left;padding: 10px; font-size: 14px;"><strong>VAT </strong>(<?php echo number_format($vat_percentage, 0); ?>%)</td>
            <td style="text-align: right; padding: 10px; font-size: 14px;"><?php echo $currency_symbol; ?> <?php echo number_format($vat_amount, 0); ?></td>
        </tr>
        <tr>
            <td style="text-align: left;background: #D3D3D3;padding: 10px; font-size: 14px;"><strong>Total Amount</strong></td>
            <td style="text-align: right;background: #D3D3D3;padding: 10px; font-size: 14px;"><?php echo $currency_symbol; ?> <?php echo number_format($total_amount_with_vat_discount, 0); ?></td>
        </tr>
    </table>
    </div>
  

    <div class="row" style="width:100%;margin-top:200px; background: lightgrey; padding: 0 20px;">
        <div class="cell">
            <h4 style="margin-top: 15px;"><u>Remarks</u></h4>
            <p style="margin-top: -10px;"><?php echo nl2br($remark); ?></p>
        </div>
    </div>
    
    <div class="footer">
        <div class="content-above">
            <p>Above information is not an invoice and only an estimate of services/goods described above.
                <br>Payment will be collected in prior to provision of services/goods described in this quote.
            </p>
        </div>
        <hr>
        <div class="content-below">
            <h3>Thank you for your business!</h3>
            <p>Should you have any enquiries concerning this quote, please contact <?php echo $full_name ?> at <?php echo $company_phone ?></p>
            <p>1023, 4th Floor TPS Building Pattanakarn Road, Suanluang, Bangkok, Thailand, 10250</p>
            <p>Tel: 02-007-5800 | Email: <?php echo $company_email; ?> | Website: www.tbs-marketing.com</p>
        </div>
    </div>

</div>





