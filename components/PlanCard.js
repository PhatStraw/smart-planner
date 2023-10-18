import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function PlanCard(props) {
    return (
        <div className="rounded m-1 w-[100%] ">
            <Carousel showThumbs={false} showStatus={false} showArrows={false}>
                {props.image.map((i)=>(
                    <div key={i}>
                        <img
                            src={i}
                            alt=""
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </Carousel>
            <div className="w-full rounded pt-4 pl-1 flex flex-col justify-between leading-normal">
                <div className="mb-1">
                    <p className="text-xl mb-1 text-gray-600 flex items-center">
                        Travel Plan #{props.day}
                    </p>
                    <div className="text-gray-900 font-bold text-xl text-left">{props.title}</div>
                </div>
                <div className="flex items-left">
                    <div className="text-xl">
                        <p className="text-gray-900 font-bold">${props.cost} Total</p>
                    </div>
                </div>
            </div>
        </div>
    )
}