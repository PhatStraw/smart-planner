'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import React from "react";
import useSearchModal from "../../hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import CountrySelect from "../inputs/CountrySelect";
import Heading from '../Heading';
import Info from '../Info';

const STEPS = {
    LOCATION: 0,
    DATE: 1,
    INFO: 2,
};

const SearchModal = () => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [activity, setActivity] = useState("")
    const [budget, setBudget] = useState()
    const [interest, setInterest] = useState([])
    const [sideNote, setSideNote] = useState(" ")
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
            sideNote,
            interest: interest,
            budget,
            activity
            //Guest Count
            //How mant Animals
            //How many adults
            //How mant kids
            //Allergies?
            //Budget should be a range slider
            //Flights and hotels or just expierence 
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
      
        const invalidKeys = Object.keys(updatedQuery).filter(key => {
            if (key === 'interest') {
                return !Array.isArray(updatedQuery[key]) || updatedQuery[key].length === 0;
            }else if(key === 'budget'){
                return updatedQuery[key] === undefined
            }
             else {
                return updatedQuery[key] === '';
            }
        });
        
        if (invalidKeys.length > 0) {
            const invalidFields = invalidKeys.join(', ');
            toast.error(`Invalid fields found in updatedQuery: ${invalidFields}`);
            return;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        setInterest([])
        setActivity("")
        setBudget()
        searchModal.onClose();
        router.push(url);
    },
        [
            step,
            searchModal,
            location,
            budget,
            interest,
            activity,
            sideNote,
            router,
            guestCount,
            roomCount,
            dateRange,
            onNext,
            bathroomCount,
            params
        ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) =>
                    setLocation(value)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            // <div className="flex flex-col gap-8">
            //     <Heading
            //         title="More information"
            //         subtitle="Find your perfect place!"
            //     />
            //     <Counter
            //         onChange={(value) => setGuestCount(value)}
            //         value={guestCount}
            //         title="Guests"
            //         subtitle="How many guests are coming?"
            //     />
            //     <hr />
            //     <Counter
            //         onChange={(value) => setRoomCount(value)}
            //         value={roomCount}
            //         title="Rooms"
            //         subtitle="How many rooms do you need?"
            //     />
            //     <hr />
            //     <Counter
            //         onChange={(value) => {
            //             setBathroomCount(value)
            //         }}
            //         value={bathroomCount}
            //         title="Bathrooms"
            //         subtitle="How many bahtrooms do you need?"
            //     />
            // </div>
            <Info
            setActivity={setActivity}
            setBudget={setBudget}
            setInterest={setInterest}
            interest={interest}
            setSideNote={setSideNote}
          />
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;




