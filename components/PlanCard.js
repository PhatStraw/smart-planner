export default function PlanCard(props) {
    return (
        <div className="rounded m-1  w-[100%] md:h-[450px]">
            <img
                className="object-cover w-full min-h-[240px] max-h-[600px] h-auto md:h-72 rounded-lg shadow-lg lg:h-80 xl:h-96"
                src={props.image}
                alt=""
            />
            <div className="w-full rounded pt-4 pl-1 flex flex-col justify-between leading-normal">
                <div className="mb-3">
                    <p className="text-xl mb-2 text-gray-600 flex items-center">
                        Travel Plan #{props.day}
                    </p>
                    <div className="text-gray-900 font-bold text-xl">{props.title}</div>
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