package com.example.bareuda.mapper;

import com.example.bareuda.entity.Member;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MemberMapper {
    public List<Member> memberList();
}
