package com.mmrsheikh.producer.service;

import com.mmrsheikh.producer.models.Course;
import com.mmrsheikh.producer.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

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

    public Course save(Course course) {
        Course saved = courseRepository.save(course);

        return saved;
    }

    public List<Course> getAll() {
        return courseRepository.findAll();
    }


    public Course getById(Long id) {
        Course found = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Course found"));

        return found;
    }

    public Course update(Long id, Course course) {
        Course found = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Course found"));

        course.setCourseId(found.getCourseId());
        return courseRepository.save(course);

    }

    public void delete(Long id) {
        Course found = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Course found"));
        courseRepository.delete(found);

    }


}
