// TANSTACK USES

// import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
// async function postsGetter() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   return await data.json(); 
// }
// function App() {
//   return (
//     <>
//       <QueryClientProvider client={new QueryClient()}>
//           <Posts />
//       </QueryClientProvider>
//     </>
//   )
// }
// function Posts() {
//  const {data,isLoading,error} = useQuery({ queryKey: ['posts'], queryFn: postsGetter, refetchInterval: 10 * 1000 })
//  return (
//   <>
//   {
//     error && (
//       <div>
//       Error encountered!
//     </div>
//     )
//    }
//    {
//     isLoading && (
//       <div>Loading....</div>
//     )
//    }
//    {!error && !isLoading && (
//     <div>
//     <ul>{data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
//   </div>
//    )}
//   </>
//  )
// }
// export default App



// VIEM USES


import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
const ethAddress  = import.meta.env.VITE_EthAddress;

const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), 
}) 

async function showBalance(){
  // const blockNumber = await client.getBlockNumber() 
  // console.log(blockNumber);
 
  const balance = await client.getBalance({address: ethAddress});
  console.log(balance);
  return balance.toString();
}

function App(){

  return(
    <QueryClientProvider client={new QueryClient()}>
    <EthBalance />
  </QueryClientProvider>
  )
}

//wagmi react-hook
function useBalance(){
  return useQuery({queryKey:['balance'], queryFn:showBalance, refetchInterval:10*1000});

}
function EthBalance(){
  const {data, isLoading, error} = useBalance();
  return(
    <div>
      {
    error && (
      <div>
      Error encountered!
    </div>
    )
   }
   {
    isLoading && (
      <div>Loading....</div>
    )
   }
   {!error && !isLoading && (
    <div>
     Balance: {data}
  </div>
   )}
    </div>
  )
}
export default App;
