import React, { useState, useEffect } from 'react';
import axiosInstance from '../../instance/axiosInstance';

//미완부분
//유저롤 변경 후 post할 api가 있는지?

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // 전체 사용자 목록을 저장하는 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUsersCount, setNewUsersCount] = useState(0);
    const [newArtistsCount, setNewArtistsCount] = useState(0);
    const usersPerPage = 10; // Number of users per page

    const fetchUsers = () => {
        axiosInstance
            .get(`/api/admin/users`)
            .then((response) => {
                setAllUsers(response.data.content); // Store all users
                filterUsers(response.data.content, 1); // Apply filter and pagination
            })
            .catch((error) => console.error('Error:', error));
    };

    // 사용자 목록 필터링 함수
    const filterUsers = (users, page) => {
        const filtered = searchTerm
            ? users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
            : users;
        paginateUsers(filtered, page);
        setTotalPages(Math.ceil(filtered.length / usersPerPage)); // Calculate total pages
    };


    // 검색어나 페이지가 변경될 때마다 실행
    useEffect(() => {
        fetchUsers();
    }, [searchTerm, allUsers, currentPage]);

    const fetchNewUsersCount = () => {
        const today = new Date().toISOString().split('T')[0];

        axiosInstance
            .get(`/api/admin/statistics/orders/daily-user-count?date=${today}`)
            .then((response) => {
                console.log(response.data); // 응답 확인을 위한 로그
                setNewUsersCount(response.data.newUserCounts);
                setNewArtistsCount(response.data.newArtistCounts);
                filterUsers(); // Apply filter after setting all users
            })
            .catch((error) => {
                console.error('Error:', error);
                // 오류 발생 시 적절한 처리
            });
    };

    useEffect(() => {
        fetchNewUsersCount();
    }, []);
    useEffect(() => {
        filterUsers(allUsers, 1); // Reset to page 1 on new search
    }, [searchTerm]);


    // Paginate users
    const paginateUsers = (users, page) => {
        const startIndex = (page - 1) * usersPerPage;
        const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);
        setUsers(paginatedUsers);
    };

    // 인풋창함수
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색버튼 함수
    const handleSearch = () => {
        // 검색 버튼을 누를 때만 필터링을 다시 실행
        fetchUsers();
    };

    //변경사항 저장하기 함수
    //api작업필요
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchUsers();
    };

    const handleRoleChange = (userId, newRole) => {
        // 역할 변경 로직
    };

    const handleSaveChanges = () => {
        // 변경 사항 저장 로직
    };

    return (
        <div className="max-w-[1000px] w-screen mx-auto pb-10 flex flex-col justify-center items-center text-white">
            <h1 className="text-center text-3xl h-[50px] ">회원관리</h1>
            <div className="flex flex-wrap justify-center items-center mt-10 my-5 h-[200px]">
                <div className="text-center mx-10 mb-4">
                    <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                        {newUsersCount}
                    </div>
                    <div>신규가입자수</div>
                    <div>(전월대비)</div>
                </div>
                <div className="text-center mx-10 mb-4">
                    <div className="flex justify-center items-center text-2xl font-bold border rounded-full w-20 h-20">
                        {newArtistsCount}
                    </div>
                    <div>신규작가회원수</div>
                    <div>(전월대비)</div>
                </div>
            </div>

            <div className=" ">
                {/* 검색창 */}
                <div className="flex justify-center items-center  mt-2 ">
                    <div className="flex flex-wrap justify-center ">
                        <input
                            type="text"
                            placeholder="아이디로 검색"
                            value={searchTerm}
                            onChange={handleSearchChange} // Updated to use handleSearchChange
                            className="border p-2 flex-grow mr-2"
                        />
                        <button onClick={handleSearch} className="border p-2">
                            🔍
                        </button>
                    </div>
                </div>

                {/* 회원 목록 */}
                <div className="w-[500px] p-4 rounded-sm">
                    {/* Header Row */}
                    <div className="flex justify-evenly border py-2 pl-2 font-bold">
                        <span className="w-16 ">아이디</span>
                        <span className="w-16 ">닉네임</span>
                        <spanc className="w-[150px] ">이메일</spanc>
                        <span className="w-20 ">현재상태</span>
                    </div>
                    <div className="border">
                        {users.map((user) => (
                            <div key={user.id} className="flex justify-evenly border-b py-2">
                                <span className="w-16 ">{user.username}</span>
                                <span className="w-16 ">{user.userNickname}</span>
                                <span className="w-[150px] ">{user.userEmail}</span>
                                <select
                                    value={user.userRole}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="border mr-2 rounded-sm"
                                >
                                    <option value="USER">USER</option>
                                    <option value="ARTIST">ARTIST</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    {/* 페이지네이션 */}
                    <div className="flex justify-center p-4">
                        {[...Array(totalPages).keys()].map((number) => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number + 1)}
                                className={`mx-1 px-3 py-1 border rounded ${
                                    currentPage === number + 1 ? 'bg-blue-500 text-white' : ''
                                }`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                    {/* 변경 사항 저장 버튼 */}
                    <div className="flex justify-center my-4">
                        <button onClick={handleSaveChanges} className="border p-2 rounded-xs ">
                            변경사항 저장하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
