import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function PlanCard(props) {
    return (
        <div className="rounded m-1 w-[100%] ">
            <Carousel showThumbs={false} showStatus={false} showArrows={false}>
                {props.image.map((i)=>(
                    <div>
                        <img
                            src={i}
                            alt=""
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </Carousel>
            <div className="w-full rounded pt-4 pl-1 flex flex-col justify-between leading-normal">
                <div className="mb-3">
                    <p className="text-xl mb-2 text-gray-600 flex items-center">
                        Travel Plan #{props.day}
                    </p>
                    <div className="text-gray-900 font-bold text-xl text-left">{props.title}</div>
                </div>
                {/* <ul className="list-disc">
                    {props.description?.map((i) => (
                        <li key={i} className="text-gray-700 text-base ml-5 m-2">{i}</li>
                    ))}
                </ul> */}
                <div className="flex items-left">
                    <div className="text-xl">
                        {/* <div className="flex flex-wrap">
                            {props.contact.map((i) => (
                                <div className="m-1 pl-1" key={i.name}>
                                    <p className="text-gray-900 leading-none pb-1">{i.name}</p>
                                    <p className="text-gray-600 pb-1">{i.number}</p>
                                </div>
                            ))}
                        </div> */}
                        <p className="text-gray-900 font-bold">${props.cost} Total</p>
                    </div>
                </div>
            </div>
        </div>
    )
}