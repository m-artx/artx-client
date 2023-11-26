import React, { useState, useEffect } from 'react';
import axiosInstance from '../../instance/axiosInstance';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // 전체 사용자 목록을 저장하는 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUsersCount, setNewUsersCount] = useState(0);
    const [newArtistsCount, setNewArtistsCount] = useState(0);
    const usersPerPage = 5; // 페이지 당 사용자 수

    //유저목록 가져오는 함수
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get(`/api/admin/users`);
            const fetchedUsers = response.data.content;
            console.log(fetchedUsers)
            setAllUsers(fetchedUsers);
            setTotalPages(Math.ceil(fetchedUsers.length / usersPerPage));
            filterAndPaginateUsers('', 1); // Display the first page of users
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //유저목록 검색
    const filterAndPaginateUsers = (term, page) => {
        const filteredUsers = term
            ? allUsers.filter((user) => user.username.toLowerCase().includes(term.toLowerCase()))
            : allUsers;
        const startIndex = (page - 1) * usersPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
    
        setUsers(paginatedUsers);
        setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));
    };

    //신규 사용자 업데이트
    const fetchNewUsersCount = () => {
        const today = new Date().toISOString().split('T')[0];

        axiosInstance
            .get(`/api/admin/statistics/orders/daily-user-count?date=${today}`)
            .then((response) => {
                setNewUsersCount(response.data.newUserCounts);
                setNewArtistsCount(response.data.newArtistCounts);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    //최초 마운트시 자동으로 전체유저 화면에 띄움
    useEffect(() => {
        fetchUsers();
    }, [] );

    //검색창 누르면 유저목록을 다시가져옴
    useEffect(() => {
        if (searchTerm) {
            filterAndPaginateUsers(searchTerm, 1);
        } else {
            // If search term is empty, show the first page of all users
            filterAndPaginateUsers('', 1);
        }
    }, [searchTerm]); // Depend only on searchTerm
    
    //신규사용지 및 신규 아티스트 호출
    useEffect(() => {
        fetchNewUsersCount();
    }, []);

    //검색필드 변경
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //검색버튼 누르면 호출
    const handleSearch = () => {
        filterAndPaginateUsers(searchTerm, 1);
        setCurrentPage(1); // Ensure currentPage is set back to 1 when searching
    };
    

    //페이지네이션
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        filterAndPaginateUsers(searchTerm, pageNumber);
    };

    //사용자 역할변경
    const handleRoleChange = (userId, newRole) => {};
    //저장버튼
    const handleSaveChanges = () => {
        alert('저장이 완료되었습니다.')
    };

    return (
        <div className="max-w-[1000px] w-screen mx-auto pb-10 flex flex-col justify-center items-center text-white">
            <h1 className="text-center text-3xl h-[50px] ">회원관리</h1>
            <div className="flex flex-wrap justify-center items-center mt-10 my-5 min-h-[10px]">
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
                            className="border-b border-t border-l p-2 flex-grow "
                        />
                        <button onClick={handleSearch} className="border-b border-t border-r bg-gray-500 p-2">
                            검색
                        </button>
                    </div>
                </div>

                {/* 회원 목록 */}
                <div className="w-[500px] p-4 rounded-sm">
                    {/* Header Row */}
                    <div className="flex justify-evenly border py-2 pl-2 font-bold">
                        <span className="w-16 ">아이디</span>
                        <span className="w-16 ">닉네임</span>
                        <span className="w-[150px] ">이메일</span>
                        <span className="w-20 ">현재상태</span>
                    </div>
                    <div className="border">
                        {users.map((user) => (
                            <div key={user.userId} className="flex justify-evenly border-b py-2">
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
