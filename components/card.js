export default function PlanCard(props) {
    return (
        <div className="w-full lg:max-w-full lg:flex m-1 bg-cyan-500 p-1">
            <div className="lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
            </div>
            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                        Day {props.day}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
                    <p className="text-gray-700 text-base">{props.description}</p>
                </div>
                <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none pb-1">{props.contact}</p>
                        <p className="text-gray-600 pb-1">{props.number}</p>
                        <p className="text-gray-600">{props.cost}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
