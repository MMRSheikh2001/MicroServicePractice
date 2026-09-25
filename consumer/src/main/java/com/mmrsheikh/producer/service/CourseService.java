package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {



    private final KafkaTemplate<String, Course> kafkaTemplate;

    private String message;

    @KafkaListener(topics = "mmrsheikh" ,groupId = "mahbub-group")
    public void getMessage(Course course){
      message=course+ "Got The Data from Kafka";

        System.out.println(message);



    }

    public String getMessage() {
        return message;
    }


}
