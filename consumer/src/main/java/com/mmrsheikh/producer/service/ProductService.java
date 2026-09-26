package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Product;
import com.mmrsheikh.producer.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

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
