package com.mmrsheikh.producer.repository;

import com.mmrsheikh.producer.models.ProcessedOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedOrderRepository extends JpaRepository<ProcessedOrder,Long> {
}
