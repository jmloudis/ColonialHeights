package com.loudis.colonielheightsshop.service;

import com.loudis.colonielheightsshop.dto.PaymentInfo;
import com.loudis.colonielheightsshop.dto.Purchase;
import com.loudis.colonielheightsshop.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

}
