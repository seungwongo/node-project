const axios = require("axios");
const cheerio = require("cheerio");

// 검색 키워드를 사용해서 인프런에서 강의 목록 웹 페이지 가져오는 함수
const getHTML = async (keyword) => {
  try {
    return await axios.get(
      "https://www.inflearn.com/courses?s=" + encodeURI(keyword)
    );
  } catch (err) {
    console.log(err);
  }
};

// 가져온 웹 페이지를 파싱해서 필요한 정보(강의 정보)만 추출하는 함수
const parsing = async (page) => {
  const $ = cheerio.load(page); // 웹 페이지를 파싱이 가능한 구조로 로드 시킴

  // 강의 목록 웹 페이지 html 구조에서 클래스명이 .course_card_item 인 html 요소에 강의 정보가 있기 때문에 이 부분에 해당하는 html 요소만 가져옴.
  const $courseList = $(".course_card_item"); 

  let courses = []; // 강의 정보를 담을 배열
  $courseList.each((idx, node) => { // 가져온 강의 목록 수 만큼 반복문 수행
    const title = $(node).find(".course_title:eq(0)").text(); // 강의 제목
    const instructor = $(node).find(".instructor").text(); // 강의 제공자

    // 수강료는 할인중인 경우는 '₩수강료₩할인된수강료' 형식 사용
    // 수강료가 무료인 경우는 '무료'
    // 수강료가 할인중이지 않을 때는 '₩수강료' 형식 사용
    const prices = $(node).find(".price").text().split("₩"); // 수강료 전체(수강료, 할인된 수강료)
    const rating = $(node).find(".star_solid").css("width"); // 별점
    const imgSrc = $(node).find(".card-image > figure > img").attr("src"); // 강의 썸네일 이미지

    const originalPrice = (prices[0] == "무료")?"무료":prices[1]; // 수강료
    const discountPrice = (prices.length == 3)?prices[2]:originalPrice; // 할인된 수강료

    courses.push({
      title: title, // 강의 제목
      instructor: instructor, // 강의 제공자
      originalPrice: originalPrice, // 수강료
      discountPrice: discountPrice, // 할인된 수강료
      rating: rating, // 별점
      imgSrc: imgSrc, // 강의 썸네일 이미지
    });
  });

  return courses;
};

// 인프런에서 제공하고 있는 강의중 파라미터로 전달한 키워드를 통해 검색된 강의 목록 가져오는 함수
const getCourse = async (keyword) => {
  const html = await getHTML(keyword);  // 인프런 강의 목록 페이지 가져오기
  const courses = await parsing(html.data); // 페이지를 파싱한 후 강의 정보를 담은 배열 가져오기
  console.log(courses);
};

getCourse("자바스크립트"); // 인프런 강의 목록 가져오기
