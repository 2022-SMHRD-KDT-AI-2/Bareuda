package com.example.bareuda.service;

import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{
    @Autowired
    private MemberMapper memberMapper;

    public Member memberList(){
        return (Member) memberMapper.memberList();
    }

    /**
     * 회원가입
     */
    @Override
    public void memberInsert(Member member){
        memberMapper.memberInsert(member);
    }

    @Override
    public Member memberLogin(Member member){
        int isMember = memberMapper.memberLogin(member);
        if(isMember == 1){
            String mb_id = member.getMb_id();
            Member login_member = memberMapper.findById(mb_id);
            return login_member;
        }else{
            return null;
        }
    }

    @Override
    public int memberRemove(Member member) {
        int isMember = memberMapper.memberLogin(member);
        if(isMember == 1){
            String mb_id = member.getMb_id();
            memberMapper.memberRemove(mb_id);
            return 1;
        }else{
            return 0;
        }
    }
}
