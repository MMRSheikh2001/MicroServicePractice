package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Order;
import com.mmrsheikh.producer.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, Order> kafkaTemplate;

    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);

        try {
            kafkaTemplate.send("order-events", savedOrder.getProductId().toString(), savedOrder)
                    .get(10, TimeUnit.SECONDS);
        } catch (Exception e) {
            throw new RuntimeException("Failed to publish order event: " + e.getMessage(), e);
        }

        return savedOrder;

    }


    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order getById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Order found"));
        return order;
    }

    public void delete(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Order found"));
        orderRepository.delete(order);
    }


}
