import React, { useState, useEffect } from 'react';
import axiosInstance from '../../instance/axiosInstance';

// 상단에 승인처리 미완료(기본으로 오픈됨), 승인처리 종결 메뉴가 있다.
// 승인처리 미완료 항목에는 게시판 형식으로 작가전환 요청 글들이 페이지네이션화 되어 한페이지에 10개씩 보인다.
// 각 행에는 글제목,작성날짜가 적혀있다.
// 게시글 목록 아래에는 페이지네이션 버튼이 있다.
// 각각의 게시글을 선택하면 
// 글제목,username,본문, 첨부된 이미지가 보이며 맨 아래에 라디오 버튼으로 승인, 미승인 둘 중 하나를 관리자가 선택하게 되어있다.
// 미승인이면 하단의 textArea에 미승인 내역을 적어서 같이 보내도록 되어있다.
// 그리고 맨 아래에는 승인처리 종결하기 버튼이 있다.
// 

const ArtistManagement = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [approvalStatus, setApprovalStatus] = useState('APPROVAL'); // 기본값은 'APPROVAL'
    const [rejectionReason, setRejectionReason] = useState('');

    const artistData = axiosInstance.get(`/api/admin/permission-requests`);
    console.log('artistData', artistData);

    useEffect(() => {
        axiosInstance
            .get(`/api/admin/permission-requests?page=${currentPage}&size=10`)
            // .get(`/api/admin/permission-requests`)
            .then((response) => {
                setRequests(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log('데이타', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
              //   if (error.response) {
              //     // 요청이 이루어졌으며 서버가 상태 코드로 응답했지만
              //     // 2xx 범위를 벗어난 상태 코드일 경우
              //     console.error('Error Response:', error.response);
              //     console.log('유즈이펙트내부');

              //     console.log('Status:', error.response.status);
              //     console.log('Data:', error.response.data);
              //     console.log('Headers:', error.response.headers);
              //     alert(`Error: ${error.response.status} - ${error.response.data.message}`);
              // } else if (error.request) {
              //     // 요청이 이루어졌지만 응답을 받지 못한 경우
              //     console.error('Error Request:', error.request);
              //     alert('Error: No response was received');
              // } else {
              //     // 요청을 설정하는 중에 문제가 발생한 경우
              //     console.error('Error Message:', error.message);
              //     alert(`Error: ${error.message}`);
              // }
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        axiosInstance
            .get(`/api/admin/permission-requests?page=${pageNumber}&size=10`)
            .then((response) => {
                setRequests(response.data.content);
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        setApprovalStatus('APPROVAL'); // Reset approval status
        setRejectionReason(''); // Reset rejection reason
    };

    const handleApprovalChange = (event) => {
        setApprovalStatus(event.target.value);
    };

    const handleRejectionReasonChange = (event) => {
        setRejectionReason(event.target.value);
    };

    const handleSubmitApproval = () => {
        const payload = {
            status: approvalStatus,
            rejectionReason: rejectionReason,
        };

        axiosInstance
            .patch(`/api/admin/permission-requests/${selectedRequest.id}`, payload)
            .then((response) => {
                // 처리 성공 후 로직
                alert('처리가 완료되었습니다.');
                setSelectedRequest(null); // Reset selected request
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="bg-white text-black shadow-lg w-[1000px] pb-20 flex flex-col">
            <h1 className="text-center border text-3xl bg-white text-black">작가전환관리</h1>
            <div className="flex justify-around border-b">
                <button className="py-2 px-4">승인처리 미완료</button>
                <button className="py-2 px-4">승인처리 종결</button>
            </div>
            <div className="p-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="border-b py-2 cursor-pointer"
                        onClick={() => handleRequestClick(request)}
                    >
                        <h2 className="font-bold">{request.permissionRequestTitle}</h2>
                        <p>{request.permissionRequestCreatedAt}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number + 1)}
                        className={`mx-1 px-3 py-1 border rounded ${
                            currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
            {selectedRequest && (
                <div className="p-4 border-t">
                    <h2 className="font-bold">{selectedRequest.permissionRequestTitle}</h2>
                    <div>
                        <input
                            type="radio"
                            name="approvalStatus"
                            value="APPROVAL"
                            checked={approvalStatus === 'APPROVAL'}
                            onChange={handleApprovalChange}
                        />{' '}
                        승인
                        <input
                            type="radio"
                            name="approvalStatus"
                            value="REFUSAL"
                            checked={approvalStatus === 'REFUSAL'}
                            onChange={handleApprovalChange}
                        />{' '}
                        미승인
                    </div>
                    {approvalStatus === 'REFUSAL' && (
                        <textarea
                            placeholder="미승인 사유"
                            value={rejectionReason}
                            onChange={handleRejectionReasonChange}
                            className="w-full mt-2"
                        ></textarea>
                    )}
                    <button onClick={handleSubmitApproval} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        승인 처리 종결하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArtistManagement;
