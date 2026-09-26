package com.mmrsheikh.producer.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    private Long orderId;

    private Long productId;

    private Double quantity;

    private String customerName;
}