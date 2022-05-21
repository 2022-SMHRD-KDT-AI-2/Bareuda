package com.example.bareuda.entity;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Member {
    private String mb_id;
    private String mb_pw;
    private String mb_name;
    private String mb_email;

}