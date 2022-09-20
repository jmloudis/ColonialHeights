package com.loudis.colonielheightsshop.service;

import com.loudis.colonielheightsshop.dao.CustomerRepository;
import com.loudis.colonielheightsshop.dto.PaymentInfo;
import com.loudis.colonielheightsshop.dto.Purchase;
import com.loudis.colonielheightsshop.dto.PurchaseResponse;
import com.loudis.colonielheightsshop.entity.Customer;
import com.loudis.colonielheightsshop.entity.Order;
import com.loudis.colonielheightsshop.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

//    public CheckoutServiceImpl(CustomerRepository customerRepository,
//                               @Value("${stripe.key.secret}") String secretKey) {
//
//        this.customerRepository = customerRepository;
//
//        // initialize Stripe API with secret key
//        Stripe.apiKey = secretKey;
//    }


    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer = purchase.getCustomer();

        // check if this is an existing customer
        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if (customerFromDB != null) {
            // we found them ... let's assign them accordingly
            customer = customerFromDB;
        }

        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "ColonialHeights purchase");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version-4) - used for tracking number id
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //

        /**
         * Set up late to check duplicates in database
         */

//        String sql = "SELECT order_tracking_number from orders where order_tracking_number = ?";
//        try (PreparedStatement stmt = dbConnection.prepareStatement(sql)) {
//            stmt.setString(1, name.trim());
//            try (ResultSet rs = stmt.executeQuery()) {
//                if (rs.next()){
//                    return false;
//                }
//            }
//        } catch (SQLException e) {
//            throw new IllegalStateException(sql, e);
//        }
//        return true;

        String uuid = UUID.randomUUID().toString();

        return uuid;
    }
}
