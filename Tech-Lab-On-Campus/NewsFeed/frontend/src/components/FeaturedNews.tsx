import Link from "next/link";
import { Article } from "@/utils/types";

interface NewsCardProps {
    article: Article;
}

function FeaturedNewsCard({ article }: NewsCardProps) {
    // Format date if available
    const formattedDate = article.publish_date 
        ? new Date(article.publish_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
          })
        : null;
        
    // Extract domain from URL for display
    const getDomain = (url: string) => {
        try {
            const domain = new URL(url);
            return domain.hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            {/* Two-column layout on larger screens */}
            <div className="md:flex">
                {/* Image container - fixed height to prevent varying sizes */}
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img
                        src={article.image_url || "/default-image.png"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Content container with fixed layout */}
                <div className="md:w-3/5 p-6 flex flex-col">
                    {/* Title with consistent height */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                    </h2>
                    
                    {/* Body text with fixed height and overflow handling */}
                    <div className="flex-grow overflow-hidden">
                        <p className="text-gray-600 line-clamp-6 mb-4">
                            {article.body}
                        </p>
                    </div>
                    
                    {/* Metadata section - always at bottom */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                            {/* Author info */}
                            <div className="mb-2 sm:mb-0">
                                {article.author && (
                                    <span className="mr-2">By <span className="font-medium">{article.author}</span></span>
                                )}
                                {formattedDate && (
                                    <span className="text-gray-400">{formattedDate}</span>
                                )}
                            </div>
                            
                            {/* Source link */}
                            {article.url && (
                                <div className="flex items-center">
                                    <span className="text-gray-400 mr-1">Via</span>
                                    <Link 
                                        href={article.url} 
                                        target="_blank"
                                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate max-w-xs"
                                    >
                                        {getDomain(article.url)}
                                    </Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        {/* Read more button */}
                        <div className="mt-4">
                            <Link
                                href={article.url || "#"}
                                target="_blank"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                Read Full Story
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedNewsCard;