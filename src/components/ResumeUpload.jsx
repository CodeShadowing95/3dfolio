import { motion } from 'framer-motion';


const ResumeUpload = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      whileTap={{ scale: 0.8 }}
      className='fixed bottom-4 right-4'
    >
      <div className="flex justify-center items-center rounded-lg p-[1px] cursor-pointer transition-all" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }} onClick={() => window.location.href = 'CV Frank Patrick Namegni.pdf'}>
        <div className="flex justify-center items-center rounded-lg gap-2 p-[12px] bg-gray-800 transition-all hover:bg-gradient-to-l from-fuchsia-500 to-cyan-500 hover:bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
          <p className="text-sm text-white font-semibold">Mon CV</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ResumeUpload