package com.example.bareuda.controller;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Result;
import com.example.bareuda.mapper.BaumannMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Slf4j
@Controller
public class BaumannController {
    @Autowired
    BaumannMapper baumannMapper;

    @RequestMapping("/baumannResult.do")
    public String baumannResult(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        Member member = (Member)session.getAttribute("member");
        String mb_id = member.getMb_id();
        Answer answer = baumannMapper.findById(mb_id);
        Result result = baumannMapper.getResult(answer);
        model.addAttribute("result", result);
        return "memberList";
    }
}
