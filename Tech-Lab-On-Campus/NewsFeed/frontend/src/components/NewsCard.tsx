import Link from "next/link";
import { Article } from "@/utils/types";

interface NewsCardProps {
    article: Article;
}

function NewsCard({ article }: NewsCardProps) {
    // Format date if available
    const formattedDate = article.publish_date 
        ? new Date(article.publish_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden group">
            {/* Image Section */}
            <div className="relative overflow-hidden">
                <img
                    src={article.image_url || "/default-image.png"}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {formattedDate && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 m-2 rounded">
                        {formattedDate}
                    </div>
                )}
            </div>

            {/* Text Section */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                    {article.title}
                </h2>
                
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{article.body}</p>

                <div className="flex justify-between items-center">
                    {/* Author */}
                    {article.author && (
                        <div className="text-xs text-gray-500">
                            By <span className="font-medium">{article.author}</span>
                        </div>
                    )}

                    {/* URL */}
                    {article.url && (
                        <Link
                            href={article.url}
                            target="_blank"
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsCard;