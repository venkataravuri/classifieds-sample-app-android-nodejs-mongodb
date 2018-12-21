@ECHO OFF
CLS
ECHO **** Welcome to MongoDB Test Data Loader Utility *****
ECHO *
ECHO *  Please choose following options: 
ECHO *    1 - Load test data
ECHO *    2 - Randomly fetch test data
ECHO *
SET /P option=*  Enter your option: 
IF "%option%"=="1" GOTO LoadTestData
IF "%option%"=="2" GOTO UpdateTestData
GOTO OptionError
#
# Invoke load test data routine
#
:LoadTestData
SET /P load=*  No. of records of test data to be loaded: 
IF "%load%"=="" GOTO Error
ECHO *  Triggering test data loader to load (%load%) documents.
start cmd.exe @cmd /k "node main.js LOAD %load%"
GOTO End
#
# Invoke update test data routine
#
:UpdateTestData
SET /P load=*  No. of records to be updated: 
IF "%load%"=="" GOTO Error
ECHO *  Triggering test data loader to update (%load%) documents.
start cmd.exe @cmd /k "node main.js UPDATE %load%"
GOTO End
#
# Error handling section(s)
#
:Error
ECHO *  You did not enter records to be loaded. Bye bye!!
GOTO End
#
:OptionError
ECHO *  
ECHO *  You did not choose right option. Bye bye!!
GOTO End
#
:End
