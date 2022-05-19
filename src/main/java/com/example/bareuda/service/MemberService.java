package com.example.bareuda.service;

import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;

public interface MemberService {
    public Member memberList();
    public void memberInsert(Member member);
    public Member memberLogin(Member member);
    public int memberRemove(Member member);
}
