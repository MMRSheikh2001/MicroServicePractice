package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class CourseService {



    private final KafkaTemplate<String, Course> kafkaTemplate;

    public String sendMessage(Course course){
        kafkaTemplate.send("mmrsheikh","course",course);

        return "Message Sent to Kafka Server";

    }



}
