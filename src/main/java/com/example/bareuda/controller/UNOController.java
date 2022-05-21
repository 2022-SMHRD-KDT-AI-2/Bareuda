package com.example.bareuda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class UNOController {
    @GetMapping("/uno")
    public String niceToMeetYou(Model model) {
        return "memberRemove";
    }
}
