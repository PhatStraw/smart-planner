import React, { useEffect, useState } from "react";
import NavBar from 'components/components/navbar/newNav';
import usePlans from 'components/hooks/usePlans';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function SelectedPlan() {
    const plansState = usePlans()

    return (
        <div>
            <NavBar />
            {plansState.selectedPlan.length ? (
                <div className="m-auto pt-24 rounded w-[100%] max-w-[1280px]">
                    <Carousel showThumbs={false} showStatus={false} showArrows={false}>
                        {plansState.selectedPlan.image.map((i) => (
                            <div key={i}>
                                <img
                                    src={i}
                                    alt=""
                                    className="rounded-lg shadow-lg max-h-[387px] md:max-h-[560px]"
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className="w-full m-3 rounded pt-4 flex flex-col justify-between leading-normal">
                        <div className="">
                            <p className="text-3xl mb-2 text-gray-600 flex items-center">
                                {plansState.selectedPlan.title}
                            </p>
                            {/* <div className="text-gray-900 font-bold text-xl text-left">{plansState.selectedPlan.total}</div> */}
                        </div>
                        {plansState.selectedPlan.itinerary.map((i) => (
                            <div key={i.day} className="w-full rounded p-3 flex border-slate-300 mb-1 flex-col justify-between leading-normal border-t">
                                <div className="mb-3">
                                    <p className="text-xl mb-2 text-gray-600 flex items-center">
                                        Day {i.day}
                                    </p>
                                    <div className="text-gray-900 font-bold text-xl text-left">{i.title}</div>
                                </div>
                                <ul className="list-disc">
                                    {i.description?.map((i) => (
                                        <li key={i} className="text-gray-700 text-base ml-5 m-2">{i}</li>
                                    ))}
                                </ul>
                                <div className="flex items-left">
                                    <div className="text-xl">
                                        <div className="flex flex-wrap">
                                            {i.contact.map((i) => (
                                                <div className="m-1 pl-1" key={i.name}>
                                                    <p className="text-gray-900 leading-none pb-1">{i.name}</p>
                                                    <p className="text-gray-600 pb-1">{i.number}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-gray-900 font-bold">{i.cost} Total</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <div>Nope</div>}
        </div>
    )
}
