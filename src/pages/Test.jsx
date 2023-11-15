import react from 'react';
import UnivSlider from '../components/UnivSlider';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useEffect } from 'react';

// UnivSlider는 이미지 배열을 prop(?)으로 갖는다

function Test() {
    let productId = 6;

    //유즈이펙트로 불러와야 초기값이 null이 안된다!

    // useEffect(() => {
    //     first;

    //     return () => {
    //         second;
    //     };
    // }, [third]);



    const PrevArrow = ({ onClick }) => {
        return (
            <div
                className="absolute top-[50%] left-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
                onClick={onClick}
            >
                <BsChevronCompactLeft />
            </div>
        );
    };

    const NextArrow = ({ onClick }) => {
        return (
            <div
                className="absolute top-[50%] right-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
                onClick={onClick}
            >
                <BsChevronCompactRight />
            </div>
        );
    };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6, // 한 화면에 보여질 슬라이드 수 (1로 설정)
        slidesToScroll: 2, // 한번에 스크롤할 슬라이드 수 (1로 설정)
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dots: false,
        accessibility: true,
        draggable: true,
        initialSlide: 2, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
        // centerMode: true, // 가운데 모드 활성화
        centerPadding: '0',
        lazyLoad: true,
    };
    return (
        // JSX에서 newData 사용
        <div>
            <h1 className="text-3xl">TEST PAGE</h1>
            <article>
                {/* {newData.loading ? (
                    <p>Loading...</p>
                ) : newData.error ? (
                    <p>Error: {newData.error.message}</p>
                ) : (
                    <div>
                        {newData.data && (
                            <ul>
                                {newData.data.content.map((item) => (
                                    <li key={item.productId}>{item.productTitle}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )} */}
            </article>
        </div>
    );
}

export default Test;
