/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from '@tanstack/react-query';
import { useFetchData } from '../../../config/axios/requestData';
import useEventsRequest from '../../../config/data/events';
import EventsServices from '../../../config/service/events';
import { Team } from '../../../types';

export interface SportEventInformationProps {
    sportDetails: {
        sportsId:any;
      sportInfo: {
        sportsName: string;
        sportsLogo: string;
        description: string;
      };
      sportEventsId:any;
      teams: Team[];
      bracketType: 'Single Elimination' | 'Double Elimination' | 'Round Robin';
    };
  }
export default function useSportEventHooks({sportDetails}:SportEventInformationProps) {
    const queryClient = useQueryClient();
    const sportEventsId = sportDetails.sportEventsId
    const { data: [matches] = [] } = useFetchData(
        ["matches"],
        [
          () => EventsServices.bracketMatch(sportEventsId)
        ]
      );
      console.log(matches)
    const { createMatchMaking, isLoading } = useEventsRequest({});
    console.log(sportDetails)
    const handleGenerateMatchup = async(values:any) =>{
        if(sportDetails.bracketType !== 'Round Robin'){
          values = values?.map((v:any) =>({
            ...v,
            date: v.date ? new Date(v.date).toISOString() : null
          }))
        }
        const formData = new FormData();
        formData.append('sportsId',sportDetails.sportsId)
        formData.append('sportEventsId',sportDetails.sportEventsId)
        formData.append('bracketType',sportDetails.bracketType)
        formData.append('teams',JSON.stringify(values))
        createMatchMaking(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["matches"] });
            },
          });
      }
  return {
    isLoading,
    matches,
    handleGenerateMatchup
  }
}
