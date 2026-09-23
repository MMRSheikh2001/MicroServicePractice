package com.MMRSheikh.question_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question_wrappers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String questionTitle;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String option1;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String option2;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String option3;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String option4;
}
