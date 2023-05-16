'use client'

import { useState, FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { findTeammatesValidator } from '@/lib/validation/search-summoner'
import Button from './ui/Button'
import Image from 'next/image'

interface FindTeammates {}
type FormData = z.infer<typeof findTeammatesValidator>

const FindTeammates: FC<FindTeammates> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [searchRole, setSearchRole] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [response, setResponse] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(findTeammatesValidator),
  })

  const findTeammates = async (championName: string, role: string) => {
    try {
      const validData = findTeammatesValidator.parse({ championName, role })
      setIsLoading(true)
      const response = fetch(`/api/findteammates`, {
        method: 'POST',
        body: JSON.stringify(validData),
      })
      return (await response).json()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    // console.log(data)
    const response = await findTeammates(data.championName, data.role)
    console.log(response[0])
    setSearchTerm('')
    
    setResponse(JSON.stringify(response))
  }

  const champions = {
    Aatrox: 266,
    Ahri: 103,
    Akali: 84,
    Akshan: 166,
    Alistar: 12,
    Amumu: 32,
    Anivia: 34,
    Annie: 1,
    Aphelios: 523,
    Ashe: 22,
    AurelionSol: 136,
    Azir: 268,
    Bard: 432,
    Belveth: 200,
    Blitzcrank: 53,
    Brand: 63,
    Braum: 201,
    Caitlyn: 51,
    Camille: 164,
    Cassiopeia: 69,
    Chogath: 31,
    Corki: 42,
    Darius: 122,
    Diana: 131,
    Draven: 119,
    DrMundo: 36,
    Ekko: 245,
    Elise: 60,
    Evelynn: 28,
    Ezreal: 81,
    Fiddlesticks: 9,
    Fiora: 114,
    Fizz: 105,
    Galio: 3,
    Gangplank: 41,
    Garen: 86,
    Gnar: 150,
    Gragas: 79,
    Graves: 104,
    Gwen: 887,
    Hecarim: 120,
    Heimerdinger: 74,
    Illaoi: 420,
    Irelia: 39,
    Ivern: 427,
    Janna: 40,
    JarvanIV: 59,
    Jax: 24,
    Jayce: 126,
    Jhin: 202,
    Jinx: 222,
    Kaisa: 145,
    Kalista: 429,
    Karma: 43,
    Karthus: 30,
    Kassadin: 38,
    Katarina: 55,
    Kayle: 10,
    Kayn: 141,
    Kennen: 85,
    Khazix: 121,
    Kindred: 203,
    Kled: 240,
    KogMaw: 96,
    KSante: 897,
    Leblanc: 7,
    LeeSin: 64,
    Leona: 89,
    Lillia: 276,
    Lissandra: 127,
    Lucian: 236,
    Lulu: 117,
    Lux: 99,
    Malphite: 54,
    Malzahar: 90,
    Maokai: 57,
    MasterYi: 11,
    Milio: 902,
    MissFortune: 21,
    MonkeyKing: 62,
    Mordekaiser: 82,
    Morgana: 25,
    Nami: 267,
    Nasus: 75,
    Nautilus: 111,
    Neeko: 518,
    Nidalee: 76,
    Udyr: 77,
    Poppy: 78,
    Yuumi: 350,
    Qiyana: 246,
    Senna: 235,
    Sett: 875,
    Rell: 876,
    Viego: 234,
    Yone: 777,
    Samira: 360,
    Seraphine: 147,
  }

  const roles = ['top', 'mid', 'jungler', 'support', 'adc']

  // const filteredRoles = roles.filter((role) =>
  //   role.toLowerCase().includes(searchRole.toLowerCase()),
  // )

  const filteredChampions = Object.entries(champions).filter(([champion]) =>
    champion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="rounded-lg bg-teal-600/40 shadow-lg lg:col-span-3 lg:p-12">
      <h3 className="text-3xl font-extrabold text-white sm:text-5xl mb-7">
        Trouvez un invocateur !
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="overflow-hidden flex flex-col gap-1">
            <input
              {...register('championName')}
              className="px-8 py-4 outline-none rounded-md bg-[#131313] text-white"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Rechercher un champion"
              list="championList"
            />
            <select
              {...register('role')}
              className="h-full px-8 py-4 outline-none rounded-md bg-[#131313] text-white"
              placeholder="Touver un invocateur..."
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          <Button isLoading={isLoading} type="submit" size={'sm'}>
            Subimit
          </Button>
        </div>
      </form>
      <p>{response}</p>
    </div>
  )
}

export default FindTeammates
