package com.example.bareuda.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Member {
    private String mbID;
    private String mbPW;
    private String mbName;
    private String myEmail;
}