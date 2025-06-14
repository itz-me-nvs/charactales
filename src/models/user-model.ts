export type CharacterModel = {
    id: number;
    name: string;
    details: string;
    created_at: string;
};

export type getCharactersType = APIEndPoint<CharacterModel[]>
export type createCharacterType = APIEndPoint<CharacterModel>


type APIEndPoint<T> = {
    hasError: boolean,
    message: string,
    data: T | null
}