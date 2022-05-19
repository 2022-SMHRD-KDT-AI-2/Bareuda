package com.example.bareuda.mapper;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MemberMapper {
    public List<Member> memberList();
    public void memberInsert(Member member);
    public int memberLogin(Member member);
    public Member findById(String mb_id);

}
