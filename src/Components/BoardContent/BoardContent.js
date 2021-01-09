import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { postWrite } from '../../Api/PostApi';
import { boardList } from '../../Api/BoardApi';
import { useLoginContext } from '../../Context/LoginData';
import PostList from './PostList';
import './BoardContent.css';

const contentplaceholder =
  '여기를 눌러서 글을 작성할 수 있습니다.\n\n[커뮤니티 이용규칙 준수] \n커뮤니티 이용규칙 전문을 반드시 숙지하신 후 글을 작성해 주세요. 이용규칙을 위반한 경우 작성한 게시물이 삭제되거나, 글쓰기 제한 등의 제재가 가해질 수 있습니다. \n\n자세한 내용은 홈 탭 우측 상단의 [내 정보] > [커뮤니티 이용규칙]을 참고하시기 바랍니다. \n\n[홍보 게시물 작성 금지] \n1. 링크 클릭, 학교 대항전, 추천인 입력 \n2. 글 작성·계정 공유 요청 등 게시물 대리 작성 행위 \n3. 공동구매, 펀딩, 기부금품 요청 행위 \n4. 그 외 모든 직간접적 광고·홍보·판매 행위 \n \n[선거, 정당·정치인 관련 게시물 작성 금지] \n1. 정당·정치인, 선거 후보자 및 관련자에 대한 비방, 비하, 모욕 \n2. 선거 후보자에 대한 지지·홍보 및 선거운동 활동 \n3. 여론조사 결과 인용 \n\n[커뮤니티 이용규칙에 어긋나는 행위 금지] \n1. 게시판의 스크린샷, 게시물 내용 유출 \n2. 욕설, 비하, 음란물, 개인정보가 포함된 게시물 게시 \n3. 특정인이나 단체/지역을 비방하는 행위 \n4. 기타 약관 및 현행법에 어긋나는 행위';

const BoardContent = () => {
  const { user } = useLoginContext();
  const { boardId, pageId } = useParams();

  const [Board, setBoard] = useState();

  const [WritePost, setWritePost] = useState(false);
  const [postOn, setPostOn] = useState(false);
  const [Post, setPost] = useState({
    board: boardId,
    title: '',
    content: '',
    is_anonym: false,
    tag: '',
  });

  useEffect(() => {
    boardList().then((response) => {
      const board = response.data.find((board) => board.id === +boardId);
      setBoard(board);
    });
    setPostOn(false);
  }, [boardId, postOn]);

  const onClickWrite = () => {
    setWritePost(true);
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setPost({
      ...Post,
      [name]: value,
    });
  };

  const onClickHashtag = () => {
    setPost({ ...Post, content: Post.content + '#' });
  };

  const onClickAnon = () => {
    setPost((post) => ({ ...post, is_anonym: !post.is_anonym }));
  };

  const onClickSubmit = () => {
    if (Post.title === '') return window.alert('제목을 입력해 주세요.');
    if (Post.content === '') return window.alert('내용을 입력해 주세요.');
    postWrite(Post, user.token);
    setPost({ ...Post, title: '', content: '' });
    setPostOn(true);
    setWritePost(false);
  };

  return (
    <section>
      {Board ? (
        <Box w="778px" h="61px" p="15px" mb="5px" border="1px" borderColor="#e3e3e3">
          <h1>{Board.title}</h1>
        </Box>
      ) : null}

      {WritePost ? (
        <div className="boardcontent-form">
          <input
            className="boardcontent-form-title"
            name="title"
            value={Post.title}
            type="text"
            size="30"
            placeholder="글 제목"
            onChange={onChangeInput}
          />
          <textarea
            className="boardcontent-form-content"
            name="content"
            value={Post.content}
            type="text"
            placeholder={contentplaceholder}
            onChange={onChangeInput}
          />
          <button className="boardcontent-hashtag" onClick={onClickHashtag} />
          <button className="boardcontent-submit" onClick={onClickSubmit} />
          <button
            className={Post.is_anonym ? 'boardcontent-anon-on' : 'boardcontent-anon-off'}
            onClick={onClickAnon}
          />
        </div>
      ) : (
        <button className="boardcontent-write" onClick={onClickWrite}>
          새 글을 작성해주세요!
        </button>
      )}
      <PostList boardId={boardId} pageId={pageId ? pageId : 1} listUpdate={postOn} />
    </section>
  );
};

export default BoardContent;
