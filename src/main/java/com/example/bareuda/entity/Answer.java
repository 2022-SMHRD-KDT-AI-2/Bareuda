package com.example.bareuda.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Answer {
    private int a_part1;
    private int a_part2;
    private int a_part3;
    private int a_part4;
    private String mb_id;
    private String mb_result;
}
