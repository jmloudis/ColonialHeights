package com.loudis.colonielheightsshop;

import com.loudis.colonielheightsshop.service.CheckoutServiceImpl;
import org.junit.jupiter.api.Test;

public class GenerateUUIDTest
{

    @Test
    void generateUuid()
    {
        CheckoutServiceImpl checkoutService = new CheckoutServiceImpl();

        String test = checkoutService.generateOrderTrackingNumber();

        System.out.println(test);
    }
}
