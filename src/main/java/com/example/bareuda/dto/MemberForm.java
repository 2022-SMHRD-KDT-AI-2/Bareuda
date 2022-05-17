package com.example.bareuda.dto;

import com.example.bareuda.entity.Board;
import com.example.bareuda.entity.Member;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class MemberForm {
    private String mem_id;
    private String mem_pw;
    private String mem_name;
    private String mem_email;

    public Member toEntity() {
        return new Member(mem_id, mem_pw, mem_name, mem_email);
    }

    public Member toLogin() {
        return new Member(mem_id, mem_pw, "이렇게 해야하나", "이렇게 해야하나");
    }
}
