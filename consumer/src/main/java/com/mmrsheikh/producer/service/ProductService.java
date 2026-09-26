package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Order;
import com.mmrsheikh.producer.models.Product;
import com.mmrsheikh.producer.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;


    @KafkaListener(topics = "order-events", groupId = "mahbub-group")
    public Product getOrder(Order order) {

        Product product = productRepository.findById(order.getProductId())
                .orElseThrow(() -> new RuntimeException("No Product found"));
        if (product.getQuantity() != null && product.getQuantity() >= order.getQuantity()) {
            product.setQuantity(product.getQuantity() - order.getQuantity());
        } else {
            throw new RuntimeException("Invalid Order");
        }

        return productRepository.save(product);


    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Product found"));
    }

    public Product update(Long id, Product product) {
        Product found = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Product found"));

        product.setProductId(found.getProductId());

        return productRepository.save(product);
    }

    public void delete(Long id) {
        Product found = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Product found"));

        productRepository.delete(found);
    }

}
