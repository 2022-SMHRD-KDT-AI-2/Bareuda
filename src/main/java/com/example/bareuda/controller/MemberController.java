package com.example.bareuda.controller;

import com.example.bareuda.dto.BaumanTestForm;
import com.example.bareuda.dto.MemberForm;
import com.example.bareuda.entity.Member;
import com.example.bareuda.mapper.MemberMapper;
import com.example.bareuda.service.MemberService;
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

    private MemberService memberService;

    @RequestMapping("/memberList.do")
    public String boardList(Model model){
        List<Member> list = memberMapper.memberList();

        model.addAttribute("list", list);
        return "memberList";
    }
    @GetMapping("/member/new")
    public String newMemberForm(){
        return "memberInsert";
    }


    @RequestMapping("/member/create")
    public String memberInsert(MemberForm form){
        log.info(form.toString());
        Member member = form.toEntity();
        memberMapper.memberInsert(member);

        return "redirect:/memberList.do"; // 바꾸기. 회원가입 성공화면. (바우만 테스트)
    }

    @GetMapping("/member/loginForm")
    public String memberLoginForm(){
        return "memberLoginTest";
    }
    @RequestMapping("/member/login")
    public String memberLogin(MemberForm form){
        log.info(form.toString());
        Member member = form.toLogin();
        int isMember = memberMapper.memberLogin(member);
        if(isMember == 1){
            return "redirect:/memberList.do"; // 바꾸기. 로그인 성공. (메인페이지로)
        }else{
            return "redirect:/member/new"; // 바꾸기. 로그인 실패화면. (로그인 화면 그대로)
        }
    }

    @GetMapping("/member/baumanTestForm")
    public String baumanTestForm(){
        return "baumanTest";
    } // 바우만 테스트 폼
    @RequestMapping("/member/baumanTest")
    public void baumanTest(BaumanTestForm form){
        int[] scores = form.calScore();
        System.out.println("점수:"+scores+"// tostring:"+form.toString());
        // 바꾸기. return 타입 string으로. 바우만 테스트 결과 페이지로.
    }
}
