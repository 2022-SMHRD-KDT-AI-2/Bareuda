package com.example.bareuda.service;

import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberMapper memberMapper;

    @Autowired
    public MemberService(MemberMapper MemberService){
        this.memberMapper = MemberService;
    }

    public Member memberList(){
        return (Member) memberMapper.memberList();
    }

    public void memberInsert(Member member){
        memberMapper.memberInsert(member);
    }
}
