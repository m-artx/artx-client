import React from 'react';
import NoticePage from './NoticePage';

function CustomerCenter() {
    const array1 = [
        {
            title: '휴가 기간 연장 공지',
            content:
                '저희 스튜디오는 12월 24일부터 1월 2일까지 휴가 기간으로 인해 문을 닫습니다. 이 기간 동안 주문하신 제품은 재개장 후 처리될 예정입니다.',
            date: '2023년 11월 1일',
        },
        {
            title: '태풍 경보로 인한 배송 지연 안내',
            content:
                '최근 태풍 경보로 인해 피해 지역의 배송이 지연될 수 있습니다. 불편을 끼쳐 드려 죄송합니다.',
            date: '2023년 10월 20일',
        },
        {
            title: '배송 서비스 파업 관련 업데이트',
            content:
                '저희 주요 배송 서비스가 현재 파업 중입니다. 대체 배송 옵션을 마련 중이니 주문 처리에 다소 지연이 있을 수 있음을 양해 부탁드립니다.',
            date: '2023년 10월 10일',
        },
        {
            title: '문의 응답 시간 증가 안내',
            content:
                '현재 문의가 폭주하여 응답 시간이 평소보다 길어질 수 있습니다. 하지만 가능한 빨리 문의에 답변 드리도록 하겠습니다.',
            date: '2023년 9월 25일',
        },
        {
            title: '새 컬렉션 출시!',
            content:
                '수제 세라믹의 새로운 컬렉션 출시를 알려드립니다! 지금 바로 온라인에서 최신 작품들을 만나보세요.',
            date: '2023년 9월 5일',
        },
        {
            title: '특별 워크숍 이벤트 공지',
            content:
                '4월 5일 세라믹 페인팅 기법에 관한 특별 워크숍에 참여하세요. 자리가 한정되어 있으니 빨리 등록하세요!',
            date: '2023년 8월 15일',
        },
        {
            title: '다음 주부터 시작되는 여름 세일',
            content:
                '저희 연간 여름 세일을 준비하세요! 다음 주 월요일부터 특정 상품에 대한 할인이 시작됩니다.',
            date: '2023년 7월 30일',
        },
        {
            title: '새로운 결제 옵션 추가 안내',
            content:
                '고객님의 편의를 위해 Apple Pay 및 Google Pay 등 더 많은 결제 옵션을 추가했습니다.',
            date: '2023년 7월 20일',
        },
        {
            title: '친환경 포장 도입',
            content:
                '환경 영향을 줄이기 위해 친환경 포장재로 전환하고 있습니다. 곧 배송되는 주문부터 이 변경사항을 기대해 주세요!',
            date: '2023년 7월 10일',
        },
        {
            title: '고객 피드백 설문조사',
            content:
                '고객님의 의견을 소중히 생각합니다. 저희 서비스 개선을 위한 몇 분간의 설문조사에 참여해 주시면 감사하겠습니다.',
            date: '2023년 6월 30일',
        },
    ];
    const array2 = [
        {
            question: '세라믹 제품이 배송 중 파손되면 어떻게 하나요?',
            answer: 'ARTX는 작가들이 택배 손상 보상에 가입하도록 요구합니다. 배송 중 파손이 확인되면 환불이 즉시 처리됩니다. 제품을 재제작하기 원하시면 작가와 협의 후 제작 날짜에 맞춰 재배송해 드립니다.',
        },
        {
            question: '작품 배송은 얼마나 걸리나요?',
            answer: '수작업으로 제작되는 작품 특성상 주문 후 제작에 약 2주 정도 소요됩니다. 배송은 제작 완료 후 가능하며, 고객님께 안내드릴 예정입니다.',
        },
        {
            question: '국제 배송도 가능한가요?',
            answer: '국제 배송은 가능합니다만, 배송비와 관세는 국가마다 다를 수 있습니다. 구체적인 배송 조건은 고객센터를 통해 문의해 주시면 안내해 드리겠습니다.',
        },
        {
            question: '작품의 반품 정책은 어떻게 되나요?',
            answer: '작품은 배송 후 14일 이내에 원래 상태로 반품이 가능합니다. 맞춤 제작이나 의뢰 작품은 반품이 불가능합니다. 반품 승인을 위해 고객 서비스 센터에 연락해 주세요.',
        },
        {
            question: '맞춤 제작 작품을 요청할 수 있나요?',
            answer: '네, 맞춤 제작 작품을 제공합니다. 고객님의 요구 사항을 저희 작가와 상의할 수 있습니다. 맞춤 주문은 제작 시간과 비용이 다를 수 있으니 자세한 사항은 저희에게 문의해 주세요.',
        },
        {
            question: '어떤 결제 방법을 받아들이나요?',
            answer: '신용카드/직불카드, PayPal, 은행 송금 등 다양한 결제 방법을 받아들입니다. 특정 지역에서는 Apple Pay 및 Google Pay와 같은 추가 옵션도 가능합니다.',
        },
        {
            question: '작품은 배송 시 어떻게 포장되나요?',
            answer: '작품은 운송 중 안전을 보장하기 위해 보호 재료로 신중하게 포장됩니다. 크거나 더 섬세한 작품은 크레이트 포장과 추가 처리가 필요할 수 있습니다.',
        },
        {
            question: '배송된 후 주문을 추적할 수 있나요?',
            answer: '네, 주문이 배송되면 추적 번호를 받게 됩니다. 이 번호를 사용해 택배 회사의 웹사이트나 저희 고객 서비스를 통해 배송 상황을 확인할 수 있습니다.',
        },
    ];

    return (
        <div className="border w-[1300px] h-[1800px] p-4 bg-white flex items-center flex-col text-black text-sm">
            {/* Notices Section */}
            <div className="w-[700px] bg-white shadow-lg rounded-lg mb-10">
                <h2 className="text-lg  bg-white font-bold mb-3 p-4 text-center">중요공지</h2>
                <ul className="p-6  bg-white h-[400px] border border-gray-400 overflow-auto">
                    {array1.map((notice, idx) => (
                        <li key={idx} className="mb-4  bg-white last:mb-0 ">
                            <div className="font-semibold bg-white  ">
                                * {notice.title}
                                <span className="px-2 text-sm bg-white text-gray-700">
                                    ({notice.date})
                                </span>
                            </div>

                            <div className="text-sm bg-white text-gray-700">{notice.content}</div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FAQ Section */}
            <div className="w-[500px] bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-bold mb-3 p-4 bg-white text-center  ">자주 묻는 질문</h2>
                <ul className="space-y-3 p-4 bg-white ">
                    {array2.map((faq, idx) => (
                        <li key={idx} className="bg-pink-100 rounded-md p-3  ">
                            <div className="bg-pink-100 rounded-md p-3 ">
                                <div className="font-semibold text-black bg-pink-100">
                                    {faq.question}
                                </div>
                                <div className="text-sm text-gray-700 bg-pink-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomerCenter;
