package com.loudis.colonielheightsshop.dto;

import com.loudis.colonielheightsshop.entity.Address;
import com.loudis.colonielheightsshop.entity.Customer;
import com.loudis.colonielheightsshop.entity.Order;
import com.loudis.colonielheightsshop.entity.OrderItem;
import lombok.Data;


import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
