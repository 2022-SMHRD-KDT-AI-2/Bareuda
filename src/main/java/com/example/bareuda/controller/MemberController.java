package com.example.bareuda.controller;

import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
@Slf4j
@Controller
public class MemberController {
    @Autowired
    private MemberMapper memberMapper;

    @RequestMapping("/memberList.do")
    public String boardList(Model model){
        List<Member> list = memberMapper.memberList();

        model.addAttribute("list", list);
        return "memberList";
    }
    @GetMapping("/create/new")
    public String newMemberForm(){
        return "memberInsert";
    }


    @PostMapping("/member/create")
    public String memberInsert(Member member){
        log.info(member.toString());
        memberMapper.memberInsert(member);

        return "";
    }
}
