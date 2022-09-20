package com.loudis.colonielheightsshop.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount;
    private String currency;
    private String receiptEmail;

}