import axios from "axios";
import Link from "next/link";

const fetchLanguages = async () => {
    const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/language`
    );
    if (error) throw new Error(error.message);
    return data;
};

const LanguageList = async () => {
    const languages = await fetchLanguages();

    return (
        <main className="w-full sm:w-[80%] md:w-[50%] mx-auto my-5 font-bold">
            <h1 className="text-2xl text-center my-5">
                Choose a language to learn
            </h1>
            <ul className="flex flex-col gap-3 rounded-lg divide-gray-200 dark:text-gray-100   dark:divide-gray-700">
                {languages?.map((lang) => (
                    <Link key={lang.id} href={`/${lang.slug}`}>
                        <li className="p-4 flex justify-between items-center rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
                            <span className="font-semibold text-sm">
                                {lang.name}
                            </span>
                            <div className="font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-full text-teal-700 bg-teal-200 dark:bg-teal-700 dark:text-teal-100">
                                {lang.slug}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </main>
    );
};

export default LanguageList;