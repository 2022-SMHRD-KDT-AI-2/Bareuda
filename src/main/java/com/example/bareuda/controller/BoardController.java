package com.example.bareuda.controller;

import com.example.bareuda.dto.BoardForm;
import com.example.bareuda.entity.Board;
import com.example.bareuda.repository.BoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class BoardController {

    @Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결.
    private BoardRepository boardRepository;

    @GetMapping("/board/new")
    public String newBoradForm(){
        return "board/new";
    }

    @PostMapping("/board/create")
    public String createBoard(BoardForm form) {
        log.info(form.toString());

        // 1. DTO를 Entity로 변환.
        Board board = form.toEntity();
        log.info(board.toString());

        // 2. Repository에게 Entity를 DB에 저장하게 한다.
        Board saved = boardRepository.save(board);
        log.info(saved.toString());

        return "";
    }
}
