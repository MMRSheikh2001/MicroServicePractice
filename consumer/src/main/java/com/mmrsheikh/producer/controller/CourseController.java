package com.mmrsheikh.producer.controller;

import com.mmrsheikh.producer.models.Course;
import com.mmrsheikh.producer.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;



    @PostMapping("/message")
    public ResponseEntity<String> getMessage(@RequestBody Course course){

        String response=courseService.getMessage();

        return ResponseEntity.ok(response);


    }
}
