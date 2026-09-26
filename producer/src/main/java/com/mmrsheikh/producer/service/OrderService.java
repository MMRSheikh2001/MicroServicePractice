package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Order;
import com.mmrsheikh.producer.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, Order> kafkaTemplate;

    public Order createOrder(Order order) {
        kafkaTemplate.send("mmrsheikh", "order", order);

        return orderRepository.save(order);

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
